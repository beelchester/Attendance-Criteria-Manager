package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	// helper "github.com/sahilyeole/attendance-criteria-manager/server/helpers"
	"github.com/sahilyeole/attendance-criteria-manager/server/database"
	"github.com/sahilyeole/attendance-criteria-manager/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	// "go.mongodb.org/mongo-driver/mongo/options"
	"github.com/go-playground/validator/v10"
    "golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "user")
var validate = validator.New()

func HashPassword(password string) string {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    if err != nil {
        log.Panic(err)
    }
    return string(bytes)
}

func VerifyPassword(userPassword string, providedPassword string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
    check := true
    if err != nil {
        check = false
    }
    return check
}

func Signup() gin.HandlerFunc {
    return func(c *gin.Context) {

        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
        var user models.User
        defer cancel()

        if err := c.BindJSON(&user); err != nil { 
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        validationErr := validate.Struct(user) 

        if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":validationErr.Error()})
			return
		}

        count, err := userCollection.CountDocuments(ctx, bson.M{"email":user.Email}) 

		defer cancel()
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error":"error occured while checking for the email"})
		}

        if count > 0 {
            c.JSON(http.StatusInternalServerError, gin.H{"error":"email already exists"})
            return
        }

        password := HashPassword(*user.Password)
		user.Password = &password

        user.ID = primitive.NewObjectID()
        user.UserID = user.ID.Hex()
        user.Token = nil
        user.RefreshToken = nil
        user.Subjects = []*models.Subject{}

        // id := "1"
        // name := "Maths"
        // totalClasses := 10
        // attendedClasses := 5
        // sub1 := models.Subject{
        //     ID: primitive.NewObjectID(),
        //     SubID: id,
        //     SubName: &name,
        //     TotalClasses: &totalClasses,
        //     AttendedClasses: &attendedClasses,
        // }
        // user.Subjects = append(user.Subjects, &sub1)

        insertIdResult, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr !=nil {
			msg := fmt.Sprintf("User item was not created")
			c.JSON(http.StatusInternalServerError, gin.H{"error":msg})
			return
		}
		defer cancel()
		c.JSON(http.StatusOK, insertIdResult)
    }
}

func Login() gin.HandlerFunc {
    return func(c *gin.Context) {
        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
        defer cancel()
        var user models.User
        var foundUser models.User

        if err := c.BindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        err := userCollection.FindOne(ctx, bson.M{"email":user.Email}).Decode(&foundUser)
        defer cancel()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "email or password is incorrect"})
            return
        }

passwordIsValid := VerifyPassword(*user.Password, *foundUser.Password)
		defer cancel()
		if passwordIsValid != true{
			c.JSON(http.StatusInternalServerError, gin.H{"error": "email or password is incorrect"})
			return
		}

        c.JSON(http.StatusOK, foundUser)
    }
}

func GetUser() gin.HandlerFunc {
    return func(c *gin.Context) {
        userId := c.Param("user_id")

        // if err := helper.ValidateID(c, userId); err != nil {
        //     c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        //     return
        // }

        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		var user models.User
		err := userCollection.FindOne(ctx, bson.M{"user_id":userId}).Decode(&user) // Decode used because go doesnt understand bson/json
		defer cancel()
        fmt.Println(userId, userCollection.Name())
		if err != nil{
            fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
        fmt.Println(user)
		c.JSON(http.StatusOK, user)
    }
}
