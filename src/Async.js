import React, { lazy, Suspense } from "react";

export const Async = Component => props => (
  <Suspense fallback={<div></div>}>
    <Component {...props} />
  </Suspense>
);

export const lazyImport = filepath => lazy(() => import(`${filepath}`));
