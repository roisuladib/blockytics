'use client';

import { useState } from 'react';

import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';

import { PRESETS } from '^lib/env';

const networks = Object.keys(PRESETS).map(e => ({
   label: e.toUpperCase(),
   value: e,
}));

export function NetworkSwitch() {
   const [value, setValue] = useState(networks[0].value);

   return (
      <Autocomplete
         className="max-w-xs"
         defaultItems={networks}
         isClearable={false}
         label="Network"
         placeholder="Search an network"
         selectedKey={value}
         variant="bordered"
         onSelectionChange={value => setValue(value as string)}>
         {item => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
   );
}
