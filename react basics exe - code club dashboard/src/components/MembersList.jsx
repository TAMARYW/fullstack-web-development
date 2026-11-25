import MemberCard from './MemberCard';

function MembersList({ members, selectedMemberId, onSelectMember, layout }) {
  if (members.length === 0) {
    return <div className="empty-state">No members to show.</div>;
  }

  return (
    <div className={`members-container ${layout}`}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          isSelected={member.id === selectedMemberId}
          onSelect={onSelectMember}
        />
      ))}
    </div>
  );
}

export default MembersList;