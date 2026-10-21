const formatKeyFeatures = (features: Record<number, string>) => {
   return Object.values(features).join('\n');
}

export default formatKeyFeatures;