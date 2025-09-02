import nodemailer from 'nodemailer';

// Configuración del transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiar por otro servicio
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Interfaz para los datos del email
export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Función para enviar email
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const mailOptions = {
      from: emailData.from || process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default transporter;