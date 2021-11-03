using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Vitra.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult BasketEmpty()
        {
            return View();
        }
        public ActionResult OrderDetail()
        {
            return View();
        }
        public ActionResult OrderDetailV2()
        {
            return View();
        }
        public ActionResult Favorite()
        {
            return View();
        }
        public ActionResult FavoriteEmpty()
        {
            return View();
        }
        public ActionResult Address()
        {
            return View();
        }
        public ActionResult AddressEmpty()
        {
            return View();
        }
        public ActionResult PersonalInfo()
        {
            return View();
        }
        public ActionResult ContactPermission()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult stockMessenger()
        {
            return View();
        }
        public ActionResult stockEmpty()
        {
            return View();
        }
        public ActionResult CouponCode()
        {
            return View();
        }
        public ActionResult CouponCodeEmpty()
        {
            return View();
        }
        public ActionResult Request()
        {
            return View();
        }

        public ActionResult RequestDetail()
        {
            return View();
        }

    }
}