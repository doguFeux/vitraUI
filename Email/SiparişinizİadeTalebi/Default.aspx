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
              <table cellpadding="0" cellspacing="0" border="0" width="700" align="center" style="border-spacing:0; border-collapse:collapse; font-family:Helvetica, Arial, sans-serif;">
        <tr>
            <td width="700" colspan="3" style="vertical-align:top;text-align:right">
                <a href="#">Bu maili düzgün görüntüleyemiyorsan, tarayıcıda açmak için tıkla</a>
            </td>
        </tr>

        <tr>
            <td width="700" colspan="3" style="vertical-align:top">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td width="600" align="center" style="vertical-align:top">
                            <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;">
                                <tr>
                                    <td width="600" align="center" style="vertical-align:top">
                                        <table cellpadding="0" align="center" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;">
                                            <tr>
                                                <td width="600" align="center" height="100" style="vertical-align: middle;color:#002e6a;font-size:18px;text-align:left">
                                                    <a href="#"><img width="120" src="cid:misc01" alt="" border="0" mc:edit="1"></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>

                        <td width="100" align="center" style="vertical-align:top">
                            <table cellpadding="0" cellspacing="0" border="0" width="100" style="border-spacing:0; border-collapse:collapse;">
                                <tr>
                                    <td width="100" align="center" style="vertical-align:top">
                                        <table cellpadding="0" align="center" cellspacing="0" border="0" width="100" style="border-spacing:0; border-collapse:collapse;">
                                            <tr>
                                                <td width="50" align="center" height="100" style="vertical-align: middle;color:#002e6a;font-size:18px;text-align:right">
                                                    <a href="#"><img width="30" src="cid:misc02" alt="" border="0" mc:edit="1"></a>
                                                </td>
                                                <td width="50" align="center" height="100" style="vertical-align: middle;color:#002e6a;font-size:18px;text-align:right">
                                                    <a href="#"><img width="30" src="cid:misc03" alt="" border="0" mc:edit="1"></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>

                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="53" colspan="3" style="vertical-align:middle;text-align:right">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" height="1" style="background-color:#778f9b;vertical-align:middle"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="60" colspan="3" style="vertical-align:middle;text-align:left">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle;font-weight:bold">
                            <b>
                                Siparişin Teslim Edildi
                            </b>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td width="700" height="40" colspan="3" style="vertical-align:top;text-align:left">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle"> Merhaba <b>XXX,</b></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="40" colspan="3" style="vertical-align:top;text-align:left">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle">
                            BiBoya'ya göstermiş olduğun ilgiye teşekkür ederiz.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="40" colspan="3" style="vertical-align:top;text-align:left">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle">
                            Siparişiniz teslim edilmiştir. Sipariş iptalini XX gün içerisinde gerçekleştirebilirsin.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="80" colspan="3" style="vertical-align:top;text-align:left">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle">
                            Sipariş sürecin ile ilgili tüm soru ve işlemlerin için
                            <a href="https://www.loncamarket.com/iletişim?raid=1234 ">adresini ziyaret edebilirsin.</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" colspan="3" style="vertical-align:middle;text-align:right">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                    <tr>
                        <td width="600" align="center" style="vertical-align:middle;">
                            <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                                <tr>
                                    <td width="600" height="30" style="vertical-align:middle;text-align:left">
                                        <b>Sipariş Bilgilerin</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="600" height="60" style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                                            <tr>
                                                <td width="300" height="30" style="vertical-align:middle;text-align:left">
                                                    <span style="color:#8089a6;font-size:12px;">Sipariş No:</span> <b>234456781</b>
                                                </td>
                                                <td width="300" height="30" style="vertical-align:middle;text-align:right">
                                                    <span style="color:#8089a6;font-size:12px;"> Sipariş Tarihi: 22.03.2019 14:30</span>
</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td width="600" height="60" style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                                            <tr>
                                                <td width="110" height="30" style="vertical-align:top;text-align:left">
                                                    <img src="cid:misc09" width="100" height="100" />
                                                </td>
                                                <td width="490" height="30" style="vertical-align:top;text-align:right">

                                                    <table cellpadding="0" cellspacing="0" border="0" width="490" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                                                        <tr>
                                                            <td width="200" height="30" style="vertical-align:top;text-align:left">
                                                                Pro Aqua No:2
                                                            </td>
                                                            
                                                                <td width="100" height="30" style="vertical-align:top;text-align:center;color:#8089a6;font-size:12px;">
                                                                    ADET
                                                                </td>
                                                                <td width="200" height="30" style="vertical-align:top;text-align:right;color:#8089a6;font-size:12px">
                                                                    TOPLAM
                                                                </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="30" style="vertical-align:top;text-align:left;color:#8089a6;font-size:12px">
                                                                Fırça
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="200" height="30" style="vertical-align:top;text-align:left;color:#8089a6;font-size:12px">
                                                                Ürün Kodu: 662010002
                                                            </td>
                                                            <td width="100" height="30" style="vertical-align:top;text-align:center">
                                                                2
                                                            </td>
                                                            <td width="200" height="30" style="vertical-align:top;text-align:right">
                                                                ₺ 159,80
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="30" style="vertical-align:top;text-align:left">
                                                                <b> ₺ 79,90</b>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="600" height="53" colspan="3" style="vertical-align:middle;text-align:right">
                                        <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                                            <tr>
                                                <td colspan="3" height="1" style="background-color:#778f9b;vertical-align:middle"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="600" height="60" style="vertical-align:middle;text-align:left">
                                        <b>
                                            Kargo Bilgilerin
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="600" height="60" style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-spacing:0; border-collapse:collapse;background-color:#fafafa;font-size:16px;">
                                            <tr>
                                                <td width="600" height="30" style="vertical-align:middle;text-align:left">
                                                    <b>
                                                        Aras Kargo
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="600" height="40" style="vertical-align:middle;text-align:left">
                                                    Kargo Takip No: <b>0212 563 3333</b>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>


                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td width="700" height="100" colspan="3" align="center" style="vertical-align:bottom;text-align:center">
                <table cellpadding="0" cellspacing="0" align="center" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:bottom" height="100">
                            <table cellpadding="0" align="center" height="60" cellspacing="0" border="0" width="300" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                                <tr>
                                    <td height="60" style="vertical-align:middle;text-align:center;background-color:#fd9619;color:#ffffff;border-radius:30px;">
                                        <a href="#" style="text-decoration:none;color:#ffffff;" > <b>SİPARİŞLERİM SAYFASINA </b></a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td width="700" height="350" colspan="3" style="vertical-align:middle;text-align:right">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" style="vertical-align:middle">
                            <img src="cid:misc04" width="700" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td width="700" height="53" colspan="3" style="vertical-align:middle;text-align:right">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td colspan="3" height="1" style="background-color:#778f9b;vertical-align:middle"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="100" colspan="3" style="vertical-align:middle;text-align:right">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#ffffff;font-size:16px;">
                    <tr>
                        <td width="600" height="53" colspan="3" style="vertical-align:middle;text-align:right">
                            <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;backgcolor:#ffffff;font-size:16px;">
                                <tr>
                                    <td colspan="3" style="vertical-align:middle;text-align:left;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="200" style="border-spacing:0; border-collapse:separate;background-color:#ffffff;font-size:13px;">
                                            <tr>
                                                <td width="60" height="40" style="text-align:center">
                                                    <img src="cid:misc05" width="40" height="40">
                                                </td>
                                                <td width="140" style="text-align:left">
                                                    HIZLI TESLİMAT
                                                </td>
                                            </tr>

                                        </table>

                                    </td>
                                    <td colspan="3" style="vertical-align:middle;text-align:center;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="200" style="border-spacing:0; border-collapse:separate;background-color:#ffffff;font-size:13px;">
                                            <tr>
                                                <td width="60" height="40" style="text-align:center">
                                                    <img src="cid:misc06" width="40" height="40">
                                                </td>
                                                <td width="140" style="text-align:left">
                                                    KOLAY DEĞİŞİM VE İADE
                                                </td>
                                            </tr>

                                        </table>

                                    </td>
                                    <td colspan="3" style="vertical-align:middle;text-align:right;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="200" style="border-spacing:0; border-collapse:separate;background-color:#ffffff;font-size:13px;">
                                            <tr>
                                                <td width="60" height="40" style="text-align:center">
                                                    <img src="cid:misc07" width="40" height="40">
                                                </td>
                                                <td width="140" style="text-align:left">
                                                    GÜVENLİ ALIŞVERİŞ
                                                </td>
                                            </tr>

                                        </table>

                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td width="700" height="260" colspan="3" style="vertical-align:top;text-align:right;background-color:#232d4e;">
                <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#232d4e;font-size:16px;">
                    <tr>
                        <td colspan="3" height="50" style="background-color:#232d4e;vertical-align:bottom;color:#b8c3e9;text-align:center;">
                            BİZİ TAKİP ET
                        </td>
                    </tr>
                    <tr>
                        <td width="700" height="120" colspan="3" style="vertical-align:top;text-align:center;background-color:#232d4e;">
                            <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#232d4e;font-size:16px;">
                                <tr>
                                    <td width="340" height="50" style="background-color:#232d4e;vertical-align:bottom;color:#b8c3e9;text-align:right;">
                                        <a href="#">
                                            <img style="background: white;border-radius: 20px;" width="40" src="cid:misc02" alt="" border="0" mc:edit="1">
                                        </a>
                                    </td>
                                    <td width="20" height="50" style="background-color:#232d4e;vertical-align:bottom;color:#b8c3e9;text-align:center;">
                                    </td>
                                    <td width="340" height="50" style="background-color:#232d4e;vertical-align:bottom;color:#b8c3e9;text-align:left;">
                                        <a href="#"><img width="40" src="cid:misc03" alt="" border="0" mc:edit="1"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="700" height="50" colspan="3" style="vertical-align:bottom;text-align:right;background-color:#232d4e;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#232d4e;font-size:16px;">
                                            <tr>
                                                <td width="50" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                </td>
                                                <td width="100" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    Yardım
                                                </td>
                                                <td width="100" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    Yardım
                                                </td>
                                                <td width="100" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    İptal İade
                                                </td>
                                                <td width="100" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    İletişim
                                                </td>
                                                <td width="200" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    Site Kullanım Koşulları
                                                </td>

                                                <td width="50" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="700" height="50" colspan="3" style="vertical-align:bottom;text-align:right;background-color:#232d4e;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#232d4e;font-size:16px;">
                                            <tr>
                                                <td width="80" height="50" style="background-color:#232d4e;vertical-align:bottom;color:#7f8cbb;text-align:center;">
                                                    <img src="cid:misc08" width="80" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="700" height="40" colspan="3" style="vertical-align:middle;text-align:right;background-color:#232d4e;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-spacing:0; border-collapse:collapse;background-color:#232d4e;font-size:16px;">
                                            <tr>
                                                <td height="30" style="background-color:#232d4e;vertical-align:middle;color:#7f8cbb;text-align:center;">
                                                    Bi'Boya bir Kalekim markasıdır. © 2020. Bi’Boya.com.tr
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
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
