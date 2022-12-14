import { useState, useEffect } from 'react';

export default function RemoteText({remoteConfig, store, className, style = {}}) {
	const [value, setValue] = useState("");
  useEffect(() => {
    if(remoteConfig !== null) {
      setValue(JSON.parse(remoteConfig.getValue(store)._value));
    }
  }, [remoteConfig])
	return (
		<p className={className} style={style}>{value}</p>
	)
}