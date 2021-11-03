<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    
</head>
<body>
    <form id="form1" runat="server">
        <table cellpadding="0" cellspacing="0" align="center" style="margin: 100px; font-size: 12px; font-family: Tahoma; color: #333;">
            <tr>
                <td class="mainTableFirstCellStyle" style="border-width: 0px;">
                    <asp:Label runat="server" ID="lblMsg" Visible="false" CssClass="warningStyle" Style="margin: 10px 0px 30px 0px; font-size: 12px; display: block;" />
                    konu basligi
                    <br />
                    <asp:TextBox runat="server" ID="tbSubject" Style="width: 600px;" />

                    <br />
                    <br />
                    <br />

                    email adresleri virgül ile ayrılmalıdır 

                    <br />

                    <asp:TextBox runat="server" ID="tbEmails" Style="width: 600px;" />

                    <br />
                    <br />
                    <br />

                    <asp:Button runat="server" ID="btnSendEmail" Text="Gönder" OnClick="SendEmail" CssClass="formButtonStyleA" Style="margin-left: 530px;" />

                    <br />
                    <br />
                    <br />


                    <!-- HTML BURADAN BASLIYOR -->
                    <asp:Label runat="server" ID="lblEmailContent" Style="display: block;">
          <table cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="border-spacing:0; border-collapse:collapse; font-family:Helvetica, Arial, sans-serif;">
        <tr>
            <td width="600" height="24" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td width="600" colspan="3" style="vertical-align:top;text-align:center">
                <a href="#">Bu maili düzgün görüntüleyemiyorsan, tarayıcıda açmak için tıkla</a>
            </td>
        </tr>
        <tr>
            <td width="600" height="24" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td width="600" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tr>
                        <td width="4%"></td>
                        <td width="92%" style="vertical-align: middle; background: #B8B1AD; border-radius: 6px; font-family: Open Sans; font-style: normal; font-weight: 600; font-size: 12px; line-height: 24px;  text-align: center; color: #FFFFFF; ">
                            Bugüne özel: Ücretsiz kargo. Üstelik tüm siparişlerde!
                        </td>
                        <td width="4%"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" height="24" colspan="3" style="vertical-align:middle">
            </td>
        </tr>

        <tr>
            <td width="600" colspan="3" style="vertical-align:middle;text-align:center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;" align="center">
                    <tr>
                        <td colspan="3" align="center" style="text-align:center">
                            <img src="cid:misc21" style="text-align:center" />
                        </td>

                    </tr>
                </table>

            </td>
        </tr>

        <tr>
            <td width="600" height="24" colspan="3" style="vertical-align:middle">
            </td>
        </tr>

        <tr>
            <td width="600" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tr>
                        <td width="4%"></td>
                        <td width="92%" height="1" style="background:#E4E6E8;">
                        </td>
                        <td width="4%"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" colspan="3" height="56" style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tr>
                        <td width="20%"></td>
                        <td width="60%" height="1" align="center" style="text-align:center;">
                            <table cellpadding="0" align="center" cellspacing="0" border="0" width="60%" style="">
                                <tr>

                                    <td width="60"> <a href="#">Ürünler</a></td>
                                    <td width="60">    <a href="#">İlham</a></td>
                                    <td width="60">  <a href="#">Destek</a></td>
                                </tr>
                            </table>
                        </td>
                        <td width="20%"></td>
                    </tr>
                </table>
            </td>
        </tr>


        <tr>
            <td width="600" colspan="3" style="vertical-align:middle">
                <img src="cid:misc13" style="display:block;" />
            </td>
        </tr>

        <tr>
            <td width="600" height="24" colspan="3" style="vertical-align:middle">
            </td>
        </tr>

        <tr>
            <td width="600" align="center" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" align="center" cellspacing="0" border="0" style="">
                    <tbody>
                        <tr>
                            <td style="font-family: Open Sans; font-style: normal; font-weight: 600; font-size: 20px; line-height: 28px; /* identical to box height, or 140% */ text-align: center; /* b2 */ color: #373A37;">
                                Sizi özledik.
                            </td>
                        </tr>
                        <tr>
                            <td height="18"></td>
                        </tr>
                        <tr>
                            <td style="font-family: Open Sans; font-style: normal; font-weight: normal; font-size: 14px; line-height: 24px; /* or 171% */ text-align: center; /* b2 */ color: #373A37; ">
                                VitrA.com.tr üyelik bilgileriniz aşağıda belirtildiği
                                gibidir. İlginize teşekkür eder, keyifli alışverişler dileriz.
                            </td>
                        </tr>
                        <tr>
                            <td height="18"></td>
                        </tr>
                        <tr>
                            <td width="284" height="50" valign="middle" align="center" style="font-family: Open Sans; font-style: normal; font-weight: 600; font-size: 16px; line-height: 24px; /* or 150% */ text-align: center; color: #FFFFFF; background-color: #A1413D; width: 284px; height: 50px; border-radius: 6px; ">
                                <a href="#">Alışverişe Başla</a>
                            </td>
                        </tr>
                        <tr>
                            <td height="18"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>


        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>

        <tr>
            <td width="600" colspan="3" align="center" style="vertical-align:middle">
                <table align="center" cellpadding="0 cellspacing="0" border="0" width="480" style="">
                    <tr>
                        <td width="80"><img src="cid:misc02" /></td>
                        <td width="80"><img src="cid:misc03" /></td>
                        <td width="80"><img src="cid:misc04" /></td>
                        <td width="80"><img src="cid:misc05" /></td>
                        <td width="80"><img src="cid:misc06" /></td>

                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td width="600" align="center" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" align="center" cellspacing="0" border="0" width="256" style="">
                    <tbody>
                        <tr>
                            <td width="32">
                                <table cellpadding="0" align="center" cellspacing="0" border="0" width="32" style="">
                                    <tbody>
                                        <tr>
                                            <td width="32">
                                                <a href="#">
                                                    <img src="cid:misc09" style="display:block" />
                                                </a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="32">
                                <table cellpadding="0" align="center" cellspacing="0" border="0" width="32" style="">
                                    <tbody>
                                        <tr>
                                            <td width="32">
                                                <a href="#">
                                                    <img src="cid:misc20" style="display:block" />
                                                </a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="32">
                                <table cellpadding="0" align="center" cellspacing="0" border="0" width="32" style="">
                                    <tbody>
                                        <tr>
                                            <td width="32">
                                                <a href="#">
                                                    <img src="cid:misc12" style="display:block" />
                                                </a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="32">
                                <table cellpadding="0" align="center" cellspacing="0" border="0" width="32" style="">
                                    <tbody>
                                        <tr>
                                            <td width="32">
                                                <a href="#">
                                                    <img src="cid:misc22" style="display:block" />
                                                </a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="32">
                                <table cellpadding="0" align="center" cellspacing="0" border="0" width="32" style="">
                                    <tbody>
                                        <tr>
                                            <td width="32">
                                                <a href="#">
                                                    <img src="cid:misc16" style="display:block" />
                                                </a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>

        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td align="center" width="600" colspan="3" style="vertical-align:middle">
                <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tbody>
                        <tr>
                            <td style="font-family: Open Sans; font-style: normal; font-weight: normal; font-size: 14px; line-height: 24px; /* identical to box height, or 171% */ text-align: center; color: #A1413D ">Web Sitesini Görüntüle</td>
                        </tr>
                        <tr>
                            <td width="600" height="16" colspan="3" style="vertical-align:middle">
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family: Open Sans; font-style: normal; font-weight: normal; font-size: 12px; line-height: 24px; /* or 200% */ text-align: center; /* darkgray */ color: #7D8285; ">
                                Bu e-posta mesajı ve ekleri, yalnızca gönderildiği kişi veya kuruma özeldir. Doğru alıcıya ulaşmamış olması halinde, başka bir alıcıya yönlendirilmesi, kopyalanması veya kullanılması yasaktır.
                                Üyelikten çıkmak için tıklayın.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td width="600" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tbody>
                        <tr>
                            <td width="4%"></td>
                            <td width="92%" height="1" style="background:#E4E6E8;">
                            </td>
                            <td width="4%"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
        <tr>
            <td width="600" colspan="3" style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="">
                    <tbody>
                        <tr>
                            <td width="50%" style="text-align:left">
                                <img src="cid:misc21" />
                            </td>
                            <td width="50%" style="text-align:right">
                                <img src="cid:misc08" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td width="600" height="36" colspan="3" style="vertical-align:middle">
            </td>
        </tr>
    </table>
                    </asp:Label>
                    <!-- HTML BURADA  BITIYOR -->

                </td>
            </tr>
        </table>
    </form>
</body>
</html>
