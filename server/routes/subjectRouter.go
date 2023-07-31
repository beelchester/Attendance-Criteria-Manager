
package routes

import (
    controller "github.com/sahilyeole/attendance-criteria-manager/server/controllers"
    // "github.com/sahilyeole/attendance-criteria-manager/server/middlewares"
    "github.com/gin-gonic/gin"
)

// AuthRoutes function, taking instance of router which is of type *gin.Engine


func SubjectRoutes (incomingRoutes *gin.Engine) {

    // middleware needed, later to do
    // incomingRoutes.Use(middleware.Authenticate()) 

    incomingRoutes.POST("/subjects/create", controller.CreateSubject())
    incomingRoutes.PATCH("/subjects/update", controller.UpdateSubject())
    incomingRoutes.DELETE("/subjects/delete", controller.DeleteSubject())
    incomingRoutes.GET("/subjects/get", controller.GetSubjects())

}

