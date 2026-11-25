function MemberCard({ member, isSelected, onSelect }) {
  const { name, role, isActive } = member;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  let btnClass = 'btn-member';
  if (role === 'Leader') btnClass = 'btn-leader';
  if (role === 'Guest') btnClass = 'btn-guest';

  return (
    <div
      className={`member-card ${!isActive ? 'inactive' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(member.id)}
    >
      <div className="avatar-circle">{initials}</div>
      <div className="member-info">
        <h3>{name}</h3>
        <span className="role-badge">{role}</span>
      </div>
      <button className={`role-btn ${btnClass}`} disabled={!isActive}>
        {role}
      </button>
    </div>
  );
}

export default MemberCard;