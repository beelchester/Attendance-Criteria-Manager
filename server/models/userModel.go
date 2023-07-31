package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty"`     
    Name        *string             `bson:"name"`
    Email       *string             `bson:"email" validate:"required,email"`
    Password    *string             `bson:"password"`
    Picture     *string             `bson:"picture"`
    Token       *string             `bson:"token"`
    RefreshToken *string            `bson:"refresh_token"`
    Subjects []*Subject             `bson:"subjects"`
}
