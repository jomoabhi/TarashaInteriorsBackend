module.exports = (user, Payment_details, service_name) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmation - Interior Design Services</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5; 
                  
  
              }
      
              
              .header {
                  background-color: #000000; 
                  text-align: center;
                  padding: 20px 0;
                  color: #fff; 
                  
  
              }
      
              h1 {
                  font-size: 24px;
                  
  
              }
      
              
              .content {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              
                  color: #333; 
                  text-align: justify;
  
              }
      
              .footer {
                  background-color: #000000;
                  text-align: center;
                  padding: 20px 0;
                  color: #fff; 
              
  
              }
      
              ul {
                  list-style-type: disc;
                  margin-left: 20px;
              }
      
              
              
          </style>
      </head>
      <body>
          <div class="header">
          <img src="https://res.cloudinary.com/dfoggertn/image/upload/v1698483266/icon_c2hwoa.png" alt="Company Logo">

              <h1>Client Payment Confirmation - Interior Design Services</h1>
          </div>
      
          <div class="content">
              <p>Hey Neha</p>
      
              <p>You Have a New <strong>${service_name}</strong> Payment</p>
      
              <p>Here are the details of  payment made By Client:</p>
      
              <ul>
                    <li><strong>Client Name:</strong> ${user.name}</li>
                    <li><strong>Client Email:</strong> ${user.email}</li>
                    <li><strong>Client Phone:</strong> ${Payment_details.number}</li>
                  <li><strong>Payment Amount:</strong> ₹${Payment_details.amount}</li>
                  <li><strong>Payment Date:</strong> ${Payment_details.payment_date}</li>
                  <li><strong>Booking Date:</strong> ${Payment_details.booking_date}</li>
                  <li><strong>Booked Time Slot:</strong> ${Payment_details.slot}</li>
                  <li><strong>Payment ID:</strong>${Payment_details.payment_id} </li>
                  <li><strong>Payment Method:</strong> ${Payment_details.payment_method}</li>
              </ul>



    
              
      
            
          </div>
      
          <div class="footer">
              <p>Tarasha Interiors &copy;&nbsp; All Rights Reserved</p>
          </div>
      </body>
      </html>
      `;
};
