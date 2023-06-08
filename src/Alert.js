import React from "react"

function Alert({alertMsgs=[]}) {
  return (
    <div className="Alert alert alert-danger m-2">
      {alertMsgs.map(msg => <p key={msg}>{msg}</p>)}
    </div>
  )
}

export default Alert