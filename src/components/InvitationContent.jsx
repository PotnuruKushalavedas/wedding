function InvitationContent() {
  return (
    <div className="invitation-card__content">
      <p className="invitation-card__greeting">ఓం నమో వెంకటేశాయ</p>
      <div className="invitation-card__initials" aria-label="V and A initials">
        <span className="initial initial--left">V</span>
        <span className="initial initial--ampersand">&amp;</span>
        <span className="initial initial--right">A</span>
      </div>
      <p className="invitation-card__line">YOU ARE CORDIALLY INVITED TO THE</p>
      <h1 className="invitation-card__title">ENGAGEMENT</h1>
      <h2 className="invitation-card__subtitle">CEREMONY</h2>
    </div>
  );
}

export default InvitationContent;
