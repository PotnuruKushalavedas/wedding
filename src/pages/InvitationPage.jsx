import '../styles/InvitationPage.css';

function InvitationPage({ onBack }) {
  return (
    <main className="invitation-portal">
      {onBack && (
        <button type="button" className="invitation-portal__back" onClick={onBack}>
          Back
        </button>
      )}
      <section className="invitation-portal__card">
        <p className="invitation-portal__eyebrow">With grace and joy</p>
        <h1>V & A</h1>
        <p className="invitation-portal__body">
          The celebration continues with love, tradition, and unforgettable moments.
        </p>
      </section>
    </main>
  );
}

export default InvitationPage;
