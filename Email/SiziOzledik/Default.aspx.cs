using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Mail;
using System.Reflection;

public partial class Default : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void SendEmail(object sender, EventArgs e)
    {
        lblMsg.Visible = true;

        try
        {
            // HTML TEXT
            string strHtml = "<!DOCTYPE html>" +
                              "<html>" +
                                "<head>" +
                                  "<title></title>" +
                                  "<meta charset='UTF-8' />" +
                                  "<style type='text/css'>" +
                                  "p { margin:0; padding:0; }" +
                                  ".ReadMsgBody { width: 100%; }" +
                                  ".ExternalClass { width: 100%; }" +
                                  ".ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; margin:0; }" +
                                  "#outlook a {padding:0;}" +
                                  "</style>" +
                                "</head>" +
                                "<body marginheight='0' marginwidth='0' topmargin='0' leftmargin='0' bgcolor='#ffffff'>" +
                                  lblEmailContent.Text +
                                "</body>" +
                              "</html>";

            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(strHtml, null, "text/html");
            string mediaType = System.Net.Mime.MediaTypeNames.Image.Jpeg;

            // EMBEDDED IMAGES
            LinkedResource misc01 = new LinkedResource(Server.MapPath("images/active_step.png"), mediaType);
            LinkedResource misc02 = new LinkedResource(Server.MapPath("images/cat1.png"), mediaType);
            LinkedResource misc03 = new LinkedResource(Server.MapPath("images/cat2.png"), mediaType);
            LinkedResource misc04 = new LinkedResource(Server.MapPath("images/cat3.png"), mediaType);
            LinkedResource misc05 = new LinkedResource(Server.MapPath("images/cat4.png"), mediaType);
            LinkedResource misc06 = new LinkedResource(Server.MapPath("images/cat5.png"), mediaType);
            LinkedResource misc07 = new LinkedResource(Server.MapPath("images/delivery.png"), mediaType);
            LinkedResource misc08 = new LinkedResource(Server.MapPath("images/eczacibasi_logo.png"), mediaType);
            LinkedResource misc09 = new LinkedResource(Server.MapPath("images/facebook.png"), mediaType);
            LinkedResource misc10 = new LinkedResource(Server.MapPath("images/helpercenter.png"), mediaType);
            LinkedResource misc11 = new LinkedResource(Server.MapPath("images/hosgeldiniz.png"), mediaType);
            LinkedResource misc12 = new LinkedResource(Server.MapPath("images/instagram.png"), mediaType);
            LinkedResource misc13 = new LinkedResource(Server.MapPath("images/megabanner.png"), mediaType);
            LinkedResource misc14 = new LinkedResource(Server.MapPath("images/passive_step.png"), mediaType);
            LinkedResource misc15 = new LinkedResource(Server.MapPath("images/phone.png"), mediaType);
            LinkedResource misc16 = new LinkedResource(Server.MapPath("images/pinterest.png"), mediaType);
            LinkedResource misc17 = new LinkedResource(Server.MapPath("images/product01.png"), mediaType);
            LinkedResource misc18 = new LinkedResource(Server.MapPath("images/receipt.png"), mediaType);
            LinkedResource misc19 = new LinkedResource(Server.MapPath("images/siparis_alindi_logo.png"), mediaType);
            LinkedResource misc20 = new LinkedResource(Server.MapPath("images/twitter.png"), mediaType);
            LinkedResource misc21 = new LinkedResource(Server.MapPath("images/vitra_logo.png"), mediaType);
            LinkedResource misc22 = new LinkedResource(Server.MapPath("images/youtube.png"), mediaType);


            // -- CONTENT IDs
            misc01.ContentId = "misc01";
            misc02.ContentId = "misc02";
            misc03.ContentId = "misc03";
            misc04.ContentId = "misc04";
            misc05.ContentId = "misc05";
            misc06.ContentId = "misc06";
            misc07.ContentId = "misc07";
            misc08.ContentId = "misc08";
            misc09.ContentId = "misc09";
            misc10.ContentId = "misc10";
            misc11.ContentId = "misc11";
            misc12.ContentId = "misc12";
            misc13.ContentId = "misc13";
            misc14.ContentId = "misc14";
            misc15.ContentId = "misc15";
            misc16.ContentId = "misc16";
            misc17.ContentId = "misc17";
            misc18.ContentId = "misc18";
            misc19.ContentId = "misc19";
            misc20.ContentId = "misc20";
            misc21.ContentId = "misc21";
            misc22.ContentId = "misc22";

            // -- MEDIA TYPEs
            misc01.ContentType.MediaType = mediaType;
            misc02.ContentType.MediaType = mediaType;
            misc03.ContentType.MediaType = mediaType;
            misc04.ContentType.MediaType = mediaType;
            misc05.ContentType.MediaType = mediaType;
            misc06.ContentType.MediaType = mediaType;
            misc07.ContentType.MediaType = mediaType;
            misc08.ContentType.MediaType = mediaType;
            misc09.ContentType.MediaType = mediaType;
            misc10.ContentType.MediaType = mediaType;
            misc11.ContentType.MediaType = mediaType;
            misc12.ContentType.MediaType = mediaType;
            misc13.ContentType.MediaType = mediaType;
            misc14.ContentType.MediaType = mediaType;
            misc15.ContentType.MediaType = mediaType;
            misc16.ContentType.MediaType = mediaType;
            misc17.ContentType.MediaType = mediaType;
            misc18.ContentType.MediaType = mediaType;
            misc19.ContentType.MediaType = mediaType;
            misc20.ContentType.MediaType = mediaType;
            misc21.ContentType.MediaType = mediaType;
            misc22.ContentType.MediaType = mediaType;

            // -- ENCODINGs
            misc01.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc02.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc03.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc04.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc05.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc06.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc07.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc08.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc09.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc10.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc11.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc12.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc13.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc14.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc15.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc16.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc17.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc18.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc19.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc20.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc21.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;
            misc22.TransferEncoding = System.Net.Mime.TransferEncoding.Base64;




            // -- CONTENT TYPE NAMEs
            misc01.ContentType.Name = misc01.ContentId;
            misc02.ContentType.Name = misc02.ContentId;
            misc03.ContentType.Name = misc03.ContentId;
            misc04.ContentType.Name = misc04.ContentId;
            misc05.ContentType.Name = misc05.ContentId;
            misc06.ContentType.Name = misc06.ContentId;
            misc07.ContentType.Name = misc07.ContentId;
            misc08.ContentType.Name = misc08.ContentId;
            misc09.ContentType.Name = misc09.ContentId;
            misc10.ContentType.Name = misc10.ContentId;
            misc11.ContentType.Name = misc11.ContentId;
            misc12.ContentType.Name = misc12.ContentId;
            misc13.ContentType.Name = misc13.ContentId;
            misc14.ContentType.Name = misc14.ContentId;
            misc15.ContentType.Name = misc15.ContentId;
            misc16.ContentType.Name = misc16.ContentId;
            misc17.ContentType.Name = misc17.ContentId;
            misc18.ContentType.Name = misc18.ContentId;
            misc19.ContentType.Name = misc19.ContentId;
            misc20.ContentType.Name = misc20.ContentId;
            misc21.ContentType.Name = misc21.ContentId;
            misc22.ContentType.Name = misc22.ContentId;

            // -- CONTENT LINKs
            misc01.ContentLink = new Uri("cid:" + misc01.ContentId);
            misc02.ContentLink = new Uri("cid:" + misc02.ContentId);
            misc03.ContentLink = new Uri("cid:" + misc03.ContentId);
            misc04.ContentLink = new Uri("cid:" + misc04.ContentId);
            misc05.ContentLink = new Uri("cid:" + misc05.ContentId);
            misc06.ContentLink = new Uri("cid:" + misc06.ContentId);
            misc07.ContentLink = new Uri("cid:" + misc07.ContentId);
            misc08.ContentLink = new Uri("cid:" + misc08.ContentId);
            misc09.ContentLink = new Uri("cid:" + misc09.ContentId);
            misc10.ContentLink = new Uri("cid:" + misc10.ContentId);
            misc11.ContentLink = new Uri("cid:" + misc11.ContentId);
            misc12.ContentLink = new Uri("cid:" + misc12.ContentId);
            misc13.ContentLink = new Uri("cid:" + misc13.ContentId);
            misc14.ContentLink = new Uri("cid:" + misc14.ContentId);
            misc15.ContentLink = new Uri("cid:" + misc15.ContentId);
            misc16.ContentLink = new Uri("cid:" + misc16.ContentId);
            misc17.ContentLink = new Uri("cid:" + misc17.ContentId);
            misc18.ContentLink = new Uri("cid:" + misc18.ContentId);
            misc19.ContentLink = new Uri("cid:" + misc19.ContentId);
            misc20.ContentLink = new Uri("cid:" + misc20.ContentId);
            misc21.ContentLink = new Uri("cid:" + misc21.ContentId);
            misc22.ContentLink = new Uri("cid:" + misc22.ContentId);

            // -- FINAL ADDINGs
            htmlView.LinkedResources.Add(misc01);
            htmlView.LinkedResources.Add(misc02);
            htmlView.LinkedResources.Add(misc03);
            htmlView.LinkedResources.Add(misc04);
            htmlView.LinkedResources.Add(misc05);
            htmlView.LinkedResources.Add(misc06);
            htmlView.LinkedResources.Add(misc07);
            htmlView.LinkedResources.Add(misc08);
            htmlView.LinkedResources.Add(misc09);
            htmlView.LinkedResources.Add(misc10);
            htmlView.LinkedResources.Add(misc11);
            htmlView.LinkedResources.Add(misc12);
            htmlView.LinkedResources.Add(misc13);
            htmlView.LinkedResources.Add(misc14);
            htmlView.LinkedResources.Add(misc15);
            htmlView.LinkedResources.Add(misc16);
            htmlView.LinkedResources.Add(misc17);
            htmlView.LinkedResources.Add(misc18);
            htmlView.LinkedResources.Add(misc19);
            htmlView.LinkedResources.Add(misc20);
            htmlView.LinkedResources.Add(misc21);
            htmlView.LinkedResources.Add(misc22);


            // SETUP MAIL
            string user = "deniz.dogukan36@gmail.com";
            string pass = "dogukan36";
            string host = "smtp.gmail.com";
            int port = 587;
            bool enableSSL = true;

            MailMessage mailMessage = new MailMessage();
            mailMessage.AlternateViews.Add(htmlView);
            mailMessage.IsBodyHtml = true;
            mailMessage.To.Add(tbEmails.Text);
            mailMessage.From = new MailAddress(user);
            mailMessage.Subject = tbSubject.Text;

            SmtpClient smtp = new SmtpClient(host, port);
            smtp.EnableSsl = enableSSL;
            smtp.UseDefaultCredentials = false;

            smtp.Credentials = new NetworkCredential(user, pass);
            smtp.Send(mailMessage);

            // FEEDBACK
            lblMsg.Text = "Eklenti iletilmiştir.";
        }
        catch (Exception ex)
        {
            lblMsg.Text = "<b>HATA:</b> " + ex.ToString();
        }
    }
}