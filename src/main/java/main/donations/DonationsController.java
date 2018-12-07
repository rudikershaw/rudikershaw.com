package main.donations;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** Donations controller. */
@Controller
class DonationsController {

    /**
     * Mapping for the donations page.
     * @return the path to the view for this page.
     */
    @RequestMapping("/donate")
    public String donate() {
        return "donations/donate";
    }

    /**
     * Mapping for the donation cancelled page.
     * @return the path to the view for this page.
     */
    @RequestMapping("/donate/cancelled")
    public String cancelled() {
        return "donations/cancelled";
    }


    /**
     * Mapping for the donation successful page.
     * @return the path to the view for this page.
     */
    @RequestMapping("donate/thankyou")
    public String thankYou() {
        return "donations/thankyou";
    }
}
