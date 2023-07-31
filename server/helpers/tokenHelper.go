package helpers

import (
	"fmt"
	"time"
	jwt "github.com/dgrijalva/jwt-go"
)

type SignedUser struct {
    Email string
    Name string
    Uid string
    jwt.StandardClaims
}

const SECRET_KEY = "secret"

func GenerateToken(email string, name string, uid string) (string,string, error) {

    duration := time.Now().Local().Add(time.Second * time.Duration(24)).Unix()

    claims := SignedUser{
        Email: email,
        Name: name,
        Uid: uid,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: duration,
        },
    }

    refreshClaims := &SignedUser{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},
	}

    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

    tokenString, err := token.SignedString([]byte(SECRET_KEY))
    refreshTokenString, err := refreshToken.SignedString([]byte(SECRET_KEY))

    fmt.Println("ref", refreshTokenString)

    return tokenString, refreshTokenString, err
}

func ValidateToken(tokenString string) (claims *SignedUser, msg string) {
    token, err := jwt.ParseWithClaims(
        tokenString,
        &SignedUser{},
        func(token *jwt.Token) (interface{}, error) {
            return []byte(SECRET_KEY), nil
        },
    )

    if err != nil {
        fmt.Println("1 called")
        msg = err.Error()
        return
    }

    claims, ok := token.Claims.(*SignedUser)

    if !ok {
        // msg = "the token is invalid"
        fmt.Println("2 called")
        msg = err.Error()
        return
    }

    if claims.ExpiresAt < time.Now().Local().Unix() {
        // msg = "the token is expired"
        fmt.Println("3 called")
        msg = err.Error()
        return}


        fmt.Println("token validated")

    return claims, msg
}

