package helpers

import ("errors"

"github.com/gin-gonic/gin")

func ValidateID(c *gin.Context, userID string) (err error) {
    uid := c.GetString("uid") // Get user id from token
    err = nil

    if  userID != uid {
        err = errors.New("Unauthorized access")
    }

    return err
}
