import React from "react"

/** Alert renders alert message if errors occur
 *
 * Prop:
 *    -alertMsgs | array of messages to alert
 */
function Alert({alertMsgs=[]}) {
  return (
    <div className="Alert alert alert-danger m-2">
      {alertMsgs.map(msg => <p key={msg}>{msg}</p>)}
    </div>
  )
}

export default Alert