import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GeneralProvider } from "./assets/context";
import { HelmetProvider} from "react-helmet-async";
import { MyRouters } from "./assets/components";
import { ScrollToTop } from "./assets/custom";
const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
        <GeneralProvider>
            <BrowserRouter>
                <ScrollToTop>
                    <MyRouters />
                </ScrollToTop>
            </BrowserRouter>
        </GeneralProvider>
    </HelmetProvider>
  );
}

export default App;
