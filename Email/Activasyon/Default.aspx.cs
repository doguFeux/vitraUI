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
            LinkedResource misc01 = new LinkedResource(Server.MapPath("images/logo-copy-4.png"), mediaType);
            LinkedResource misc02 = new LinkedResource(Server.MapPath("images/icon-instagram.png"), mediaType);
            LinkedResource misc03 = new LinkedResource(Server.MapPath("images/icon-facebook.png"), mediaType);
            LinkedResource misc04 = new LinkedResource(Server.MapPath("images/renk-karti.jpg"), mediaType);
            LinkedResource misc05 = new LinkedResource(Server.MapPath("images/icon-return.png"), mediaType);
            LinkedResource misc06 = new LinkedResource(Server.MapPath("images/icon-security.png"), mediaType);
            LinkedResource misc07 = new LinkedResource(Server.MapPath("images/icon-delivery.png"), mediaType);
            LinkedResource misc08 = new LinkedResource(Server.MapPath("images/kalekim-logo-white.png"), mediaType);
            LinkedResource misc09 = new LinkedResource(Server.MapPath("images/product-image.png"), mediaType);


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

            // -- CONTENT LINKs
            misc01.ContentLink = new Uri("cid:" + misc01.ContentId);
            misc02.ContentLink = new Uri("cid:" + misc02.ContentId);
            misc03.ContentLink = new Uri("cid:" + misc03.ContentId);
            misc05.ContentLink = new Uri("cid:" + misc05.ContentId);
            misc04.ContentLink = new Uri("cid:" + misc04.ContentId);
            misc06.ContentLink = new Uri("cid:" + misc06.ContentId);
            misc07.ContentLink = new Uri("cid:" + misc07.ContentId);
            misc08.ContentLink = new Uri("cid:" + misc08.ContentId);
            misc09.ContentLink = new Uri("cid:" + misc09.ContentId);

            // -- FINAL ADDINGs
            htmlView.LinkedResources.Add(misc01);
            htmlView.LinkedResources.Add(misc02);
            htmlView.LinkedResources.Add(misc04);
            htmlView.LinkedResources.Add(misc05);
            htmlView.LinkedResources.Add(misc03);
            htmlView.LinkedResources.Add(misc06);
            htmlView.LinkedResources.Add(misc07);
            htmlView.LinkedResources.Add(misc08);
            htmlView.LinkedResources.Add(misc09);


            // SETUP MAIL
            string user = "mailing@stop63.com";
            string pass = "mailingSTOP63";
            string host = "smtp.yandex.com.tr";
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