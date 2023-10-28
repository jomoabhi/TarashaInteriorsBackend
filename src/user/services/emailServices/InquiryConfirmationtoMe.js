const handlebars = require('handlebars');

module.exports = (user, inquiryData, package_name, package_option) => {
  // Define your HTML template as a string
  const source = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Inquiry Received</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
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
  
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 0 auto; /* Center the table horizontally */
          }
  
          th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
          }
  
          th {
              background-color: #f2f2f2;
          }
  
          .header {
              background-color: #000000;
              text-align: center;
              padding: 20px 0;
              color: #fff;
          }
  
          h1 {
              font-size: 20px;
          }
  
          .footer {
              text-align: center;
              margin-top: 20px;
              padding: 10px;
              color: #fff; 

              background-color: #000000;
          }
          h1 {
            font-size: 20px;
            

        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
        }

      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
          <img src="https://res.cloudinary.com/dfoggertn/image/upload/v1698483266/icon_c2hwoa.png" alt="Company Logo">

              <h1>New Inquiry Received</h1>
          </div>
  
          <div class="content">
          <p>Hey Neha</p>
      
          <p>You Have Received a New Inquiry </strong> </p>
  
          <p>Here are the Inquiry Details </p>
          <ul>
          <li><strong>Client Name:</strong> ${user.name}</li>
          <li><strong>Client Email:</strong> ${user.email}</li>
          <li><strong>Client Phone:</strong> ${user.mobiles[0].countrycode}${
    user.mobiles[0].mobile
  }</li>
          <li><strong>Date:</strong>${new Date()}</li>
          <li><strong>Package Name: </strong>${package_name}</li>
          <li><strong>Package Option: </strong>${package_option}</li>


        </ul>
  
              <table>
                  <tr>
                      <th>Question</th>
                      <th>Answer</th>
                  </tr>
                  {{#each inquiryData}}
                  <tr>
                      <td>{{this.Question}}</td>
                      <td>{{this.Answer}}</td>
                  </tr>
                  {{/each}}
              </table>
          </div>
      </div>
      <div class="footer">
          <p>Tarasha Interiors &copy;&nbsp; All Rights Reserved</p>
      </div>
  </body>
  </html>
  
  `;

  // Compile the Handlebars template
  const template = handlebars.compile(source);

  // Create an object with data to pass to the template
  const templateData = {
    user,
    inquiryData, // This assumes you have an array named inquiryData
    package_name,
    package_option,
  };

  // Render the template with the data
  const html = template(templateData);

  return html;
};
