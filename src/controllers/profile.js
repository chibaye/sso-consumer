const Profile = {
    get: (req, res) => res.send({
        message: "You're viewing a secure page"
    })
}

export default Profile