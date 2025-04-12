const convertAllSVGToImages = async (container) => {
  const svgElements = container.querySelectorAll('svg');

  for (const svg of svgElements) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8'
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 100;
        canvas.height = img.height || 100;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');

        const imgElement = document.createElement('img');
        imgElement.src = dataUrl;
        imgElement.width = svg.getAttribute('width') || 100;
        imgElement.height = svg.getAttribute('height') || 100;

        svg.replaceWith(imgElement);

        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  }
}

export default convertAllSVGToImages