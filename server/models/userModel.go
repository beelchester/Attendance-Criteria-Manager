package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty"`     
    UserID      string              `bson:"user_id"`
    Name        *string             `bson:"name" validate:"required,min=2,max=50"`
    Email       *string             `bson:"email" validate:"required,email"`
    Password    *string             `bson:"password" validate:"required,min=6,max=50"`
    Token       *string             `bson:"token"`
    RefreshToken *string            `bson:"refreshToken"`
    Subjects []*Subject             `bson:"subjects"`
}
