package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type Subject struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty"`     
    SubName     *string             `bson:"sub_name" validate:"required,min=2,max=50"`
    TotalClasses *int               `bson:"total_classes" validate:"required"`
    AttendedClasses *int            `bson:"attended_classes" validate:"required"`
}

