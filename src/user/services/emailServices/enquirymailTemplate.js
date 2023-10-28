module.exports = (username) => {
  return ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Inquiry Received - Interior Design Services</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
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
                font-size: 22px;
                

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
              <h1>We Have Received Your Inquiry </h1>
              </div>

              <div class="content">

          <p>Dear ${username}</p>
  
          <p>Thank you for your interest in Tarasha Interiors. We appreciate your inquiry about our interior design services. We are excited to learn more about your project and how we can assist you in creating a beautiful and functional space.</p>
  
          <p>Your inquiry is important to us, and we will do our best to provide you with the information you need. Our team of experienced interior designers is ready to collaborate with you to transform your vision into reality.</p>
  
          <strong>Here are the next steps:</strong>
          <ol>
              <li><strong>Initial Consultation:</strong> To better understand your project's requirements and your design preferences, we would like to schedule an initial consultation. During this meeting, we will discuss your goals, budget, timeline, and any specific ideas or inspirations you have in mind. Please let us know your availability, and we will arrange a suitable time for the consultation.</li>
              <li><strong>Site Visit (if applicable):</strong> Depending on the project's scope and location, we may conduct a site visit to assess the space and gather essential information.</li>
              <li><strong>Design Proposal:</strong> Following the initial consultation and site visit (if needed), we will provide you with a detailed design proposal. This proposal will outline our recommended design concepts, scope of work, estimated timeline, and a cost estimate for our services.</li>
              <li><strong>Collaboration:</strong> Once you approve the design proposal, we will begin working closely with you to develop a customized interior design plan that aligns with your vision and requirements.</li>
              <li><strong>Execution:</strong> Our experienced team will execute the design plan efficiently, ensuring that your project is completed to the highest standards and within the agreed-upon timeline.</li>
          </ol>
  
          <p>We are committed to delivering outstanding interior design solutions tailored to your unique style and needs. Our goal is to create a space that not only reflects your personality but also enhances your lifestyle.</p>
  
          <p>If you have any additional questions or would like to provide us with more details about your project before the initial consultation, please don't hesitate to reply to this email or contact us directly at <strong>info@tarashainteriors.com.</strong></p>
  
          <p>Thank you for considering Tarasha Interiors for your project. We look forward to the opportunity to work with you and bring your vision to life.</p>
  </div>
  <div class="footer">
  <p>Tarasha Interiors &copy;&nbsp; All Rights Reserved</p>
</div>
      
  </body>
  </html>
  `;
};
