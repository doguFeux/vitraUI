using System.Web.Mvc;

namespace Vitra.Controllers
{
    public class CheckoutController : Controller
    {
        // GET: Checkout
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Adress()
        {
            return View();
        }
        public ActionResult Despatch()
        {
            return View();
        }
        public ActionResult Payment()
        {
            return View();
        }
        public ActionResult SuccessResult()
        {
            return View();
        }
        public ActionResult PaymentReceived()
        {
            return View();
        }

    }
}