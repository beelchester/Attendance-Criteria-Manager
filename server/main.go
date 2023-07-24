package main

import (
	routes "github.com/sahilyeole/attendance-criteria-manager/server/routes"
	"os"
	"github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    port := os.Getenv("PORT")

    if port == "" {
        port = "8000"
    }

    router := gin.New()
    router.Use(gin.Logger())

    config := cors.DefaultConfig()
config.AllowOrigins = []string{"http://localhost:3000"}
router.Use(cors.New(config))


    routes.AuthRoutes(router)
    routes.UserRoutes(router)
    routes.SubjectRoutes(router)

    router.GET("/api", func (c *gin.Context) {
        c.JSON(200, gin.H{
            "success": "Access granted to the API",
        })
    })

    router.Run(":" + port)
}
