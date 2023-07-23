package controllers

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sahilyeole/attendance-criteria-manager/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateSubject() gin.HandlerFunc {
    return func(c *gin.Context) {
        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
        defer cancel()
        
        var userID = c.Query("user_id")
        var user models.User
        var subject models.Subject

        err := userCollection.FindOne(ctx, bson.M{"user_id": userID}).Decode(&user)

        if err != nil {
            c.JSON(500, gin.H{
                "error": "user not found",
            })
            return
        }
           if err := c.BindJSON(&subject); err != nil {
                c.JSON(500, gin.H{
                     "error": err.Error(),
                })
                return
            }

            validationErr := validate.Struct(subject)
            if validationErr != nil {
                c.JSON(500, gin.H{ 
                    "error": validationErr.Error(),
                })
                return
            }

            subject.ID = primitive.NewObjectID()
            subject.SubID = subject.ID.Hex()
            user.Subjects = append(user.Subjects, &subject)

            userCollection.FindOneAndUpdate(ctx, bson.M{"user_id": userID}, bson.M{"$set": bson.M{"subjects": user.Subjects}})
            c.JSON(200, gin.H{
                "message": user.Subjects,
            })
    }
}

func UpdateSubject() gin.HandlerFunc {
    return func(c *gin.Context) {
        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
        defer cancel()
        
        var userID = c.Query("user_id")
        var subId = c.Query("sub_id")
        var user models.User
        var subject models.Subject

        err := userCollection.FindOne(ctx, bson.M{"user_id": userID}).Decode(&user)

        if err != nil {
            c.JSON(500, gin.H{
                "error": "user not found",
            })
            return
        }
           if err := c.BindJSON(&subject); err != nil {
                c.JSON(500, gin.H{
                     "error": err.Error(),
                })
                return
            }

            validationErr := validate.Struct(subject)
            if validationErr != nil {
                c.JSON(500, gin.H{ 
                    "error": validationErr.Error(),
                })
                return
            }

       subExists := false
       for _, sub := range user.Subjects {
           if sub.SubID == subId {
                subExists = true
                sub.SubName = subject.SubName
                sub.TotalClasses = subject.TotalClasses
                sub.AttendedClasses = subject.AttendedClasses
           }
       }

       if !subExists {
           c.JSON(500, gin.H{
                "error": "subject not found",
              })

              return
          }
            userCollection.FindOneAndUpdate(ctx, bson.M{"user_id": userID}, bson.M{"$set": bson.M{"subjects": user.Subjects}})
            
            c.JSON(200, gin.H{
                "message": user.Subjects,
            })

    }
}

func DeleteSubject() gin.HandlerFunc {
    return func(c *gin.Context) {

        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
        defer cancel()
        
        var userID = c.Query("user_id")
        var subId = c.Query("sub_id")
        var user models.User

        err := userCollection.FindOne(ctx, bson.M{"user_id": userID}).Decode(&user)

        if err != nil {
            c.JSON(500, gin.H{
                "error": "user not found",
            })
            return
        }

        subExists := false

        for i, sub := range user.Subjects {
            if sub.SubID == subId {
                subExists = true
                user.Subjects = append(user.Subjects[:i], user.Subjects[i+1:]...)
            }
        }

        if !subExists {
            c.JSON(500, gin.H{
                "error": "subject not found",
            })
            return
        }

        userCollection.FindOneAndUpdate(ctx, bson.M{"user_id": userID}, bson.M{"$set": bson.M{"subjects": user.Subjects}})
        c.JSON(200, gin.H{
            "message": user.Subjects,
        })
    }
}

func SyncSubjects() gin.HandlerFunc {
    return func(c *gin.Context) {
        userId := c.Param("user_id")

        var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

		var user models.User
		err := userCollection.FindOne(ctx, bson.M{"user_id":userId}).Decode(&user)
		defer cancel()
		if err != nil{
            c.JSON(500, gin.H{
                "error": "user not found",
            })
			return
		}
        c.JSON(200, gin.H{
            "message": user.Subjects,
        })
    }
}

