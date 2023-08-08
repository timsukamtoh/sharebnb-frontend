import ProfileForm from "./ProfileForm"
/** ProfilePage renders page for profile
 *
 *  Prop:
 *    -update | func passed from parent to handle edit profile
 *
 * RouteList -> ProfilePage -> ProfileForm
 */
function ProfilePage({update}) {
  return (
    <div className="ProfilePage w-100">
      <ProfileForm onSubmit={update}/>
    </div>
  )
}

export default ProfilePage