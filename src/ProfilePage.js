import ProfileForm from "./ProfileForm"

function ProfilePage({update}) {
  return (
    <div className="ProfilePage">
      <ProfileForm onSubmit={update}/>
    </div>
  )
}

export default ProfilePage