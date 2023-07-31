package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DBinstance() *mongo.Client {

    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    MongoDb := os.Getenv("MONGO_URI")
    fmt.Println("MongoDb", MongoDb)

    port := os.Getenv("PORT")

    fmt.Println("port", port)

    ctx, cancel := context.WithTimeout(context.Background(), 10* time.Second)

    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(MongoDb))

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Connected to MongoDB!")

    return client
}

var Client *mongo.Client = DBinstance()


func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
    var collection *mongo.Collection = client.Database("acm").Collection(collectionName)
    return collection
}
