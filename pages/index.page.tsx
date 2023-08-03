import React from "react";
import { Link } from "../components/navigation/Link";
import { Trans } from "@lingui/macro";

function Page(): React.ReactNode {
  return (
    <>
      <div className="h-96 overflow-hidden relative">
        <div className="absolute w-[680px] left-1/2 -translate-x-1/2 bg-white/50 dark:bg-black/80 p-8 backdrop-blur-md shadow-md">
          <h1 className="text-3xl font-bold mb-5 text-slate-900 dark:text-white">
            {" "}
            Vite + React + i18n + Vite plugin SSR + Tailwind{" "}
          </h1>
          <span className="block w-full text-justify mb-20 text-slate-600 dark:text-slate-400">
            <Trans>
              A Vite template ready to start producing professional and
              multilingual pages with minimal dependencies, perfect for creating
              simple pages, or as a starting point for complex developments.
            </Trans>
          </span>
          <Link
            href="/about"
            className="text-center w-max bg-lime-800 px-4 py-2 text-white shadow-sm rounded-md mx-auto block hover:bg-green-800 transition-colors"
          >
            <Trans>Read more</Trans>
          </Link>
        </div>
      </div>
      <div className="border-t-4 border-orange-200/40 dark:border-slate-800/90 bg-white/60 dark:bg-gray-950/90 columns-3 gap-36 p-10 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-10">
          Lorem Ipsum
        </h2>
        <p className="whitespace-pre-wrap text-slate-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipiscing elit arcu, eros
          dapibus eleifend dictum cubilia bibendum tempus ad volutpat, fermentum
          porttitor magnis nisi nullam ac placerat. Mus dictumst luctus
          consequat faucibus libero ut magnis nisi, interdum platea conubia
          penatibus nascetur integer donec senectus odio, nibh cubilia hendrerit
          feugiat ornare orci sem. Posuere taciti ad magnis vestibulum nisi eget
          risus accumsan euismod vel lacinia varius at, habitant arcu fermentum
          nostra est cras ullamcorper imperdiet cursus etiam mattis tellus.
          <br />
          <br />
          Libero quis ac nisl ut nostra iaculis venenatis facilisi, praesent
          sociis mauris et dictum dapibus class, eu nulla lacus a dignissim
          integer mi. Viverra commodo netus mi malesuada egestas aliquam morbi
          quis ultrices dapibus laoreet hac feugiat hendrerit nascetur torquent
          nam, metus leo rhoncus congue fusce augue sed nullam volutpat nisl
          velit fringilla sapien lacinia sociosqu. Primis lacus ad quis quam
          dapibus mauris sagittis orci conubia dignissim, placerat curabitur
          auctor phasellus libero aenean venenatis mus donec, porta diam nulla
          habitasse potenti blandit sociis ligula torquent. Lacinia fringilla
          dis hendrerit est ligula hac donec rutrum per quisque congue
          suspendisse rhoncus, integer porttitor habitasse fusce euismod id
          ultricies himenaeos venenatis tristique gravida.
          <br />
          <br />
          Est ultricies habitasse penatibus nec volutpat dui, fusce ultrices
          suscipit vitae rhoncus ullamcorper, ligula vel gravida senectus
          dapibus. Lectus vestibulum habitasse et dignissim blandit vel cubilia
          est ad sollicitudin proin, id tempor ultrices hendrerit imperdiet cum
          nam ut vivamus. Iaculis tellus turpis nam facilisis mauris curae class
          dapibus commodo eros, fusce senectus ultrices erat blandit dictum
          fringilla montes ligula placerat hendrerit, sociis imperdiet leo
          lacinia nascetur vulputate ante conubia cubilia. Magna erat phasellus
          placerat at quis porttitor dignissim, nullam ac posuere mus hac purus
          magnis imperdiet, aliquet laoreet auctor litora dis parturient.
          <br />
          <br />
          Leo netus vitae hac ultrices volutpat iaculis suspendisse nam urna
          fringilla metus venenatis id facilisi dis, primis eleifend mus donec
          viverra semper auctor tincidunt ornare dapibus aenean sed parturient
          arcu. Torquent hendrerit consequat senectus nullam urna egestas hac
          purus duis imperdiet, per litora diam mattis nec suscipit vivamus
          scelerisque eros cras, dictumst ligula condimentum curae ac turpis
          massa commodo potenti. Sollicitudin habitant at pellentesque aenean
          hac ad vestibulum tristique, ut mus auctor enim maecenas cum rutrum,
          ornare accumsan fermentum varius commodo rhoncus neque. Enim volutpat
          dui orci morbi rhoncus vitae pellentesque ultricies fames turpis, id
          bibendum dis etiam tempus primis mattis sem ante inceptos, magna
          vehicula montes <br />
          <br />
        </p>
      </div>
    </>
  );
}

export { Page };
