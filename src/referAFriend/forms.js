import './referral.css'

function Forms() {
    return (
      <div className ="form-container">
        <div className="boxrefa">
          <form action="http://localhost:3000/send-email" method="POST">
            <label htmlFor="email">Enter your email address:</label>
            <input type="email" id="email" name="email" required />
            <button type="submit">Send Referral</button>
          </form>
        </div>
  
        <div className="boxrefa">
          <form action="http://localhost:3000/verify-referral" method="POST">
            <label htmlFor="code">Enter your referral code:</label>
            <input type="text" id="code" name="code" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Forms;
  