import Button from './Button';

function ProfileCard({ avatar, name, description, type }) {
  return (
    <div className="profile-card">
      <img src={avatar} alt={name} className="avatar" />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-description">{description}</p>
      <Button type={type} text={`Connect with ${type}`} />
    </div>
  );
}

export default ProfileCard;