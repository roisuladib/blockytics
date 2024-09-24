import type { Children } from '^types';

type ComponentsWithProps<Components extends readonly React.JSXElementConstructor<any>[]> = {
   [key in keyof Components]: keyof React.ComponentProps<Components[key]> extends never
      ? readonly [Components[key]]
      : readonly [Components[key], React.ComponentProps<Components[key]>];
} & { length: Components['length'] };

export const buildProvidersTree = <T extends readonly React.JSXElementConstructor<any>[]>(
   componentsWithProps: ComponentsWithProps<T>,
) => {
   const initialComponent: React.FC<Children> = ({ children }) => <>{children}</>;

   initialComponent.displayName = 'InitialComponent';

   return componentsWithProps.reduce((AccumulatedComponents, [Provider, props = {}], index) => {
      const ComponentWithProvider = ({ children }: Children) => (
         <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
         </AccumulatedComponents>
      );

      ComponentWithProvider.displayName = `ProviderComponent-${index}`;

      return ComponentWithProvider;
   }, initialComponent);
};
