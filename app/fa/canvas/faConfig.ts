export const faStylesheet: any[] = [
  // 节点样式
  {
    selector: 'node',
    style: {
      'background-color': '#313244', // ctp-surface0
      'border-color': '#585b70', // ctp-surface2
      'border-width': 2,
      'width': 64,
      'height': 64,
      'label': 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#cdd6f4', // ctp-text
      'font-size': 14,
      'font-weight': 'bold',
      'cursor': 'move'
    }
  },
  
  // 初始状态节点
  {
    selector: 'node[isInitial]',
    style: {
      'border-color': '#a6e3a1', // ctp-green
      'border-width': 3
    }
  },
  
  // 终止状态节点 - 双圆圈效果
  {
    selector: 'node[isFinal]',
    style: {
      'border-color': '#f38ba8', // ctp-pink
      'border-width': 4,
      'border-style': 'double'
    }
  },
  
  // 选中状态
  {
    selector: 'node:selected',
    style: {
      'border-color': '#89b4fa', // ctp-blue
      'border-width': 3,
      'box-shadow': '0 0 10px #89b4fa'
    }
  },
  
  // 边样式
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#6c7086', // ctp-overlay0
      'target-arrow-color': '#6c7086',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'label': 'data(label)',
      'text-rotation': 'autorotate',
      'text-margin-y': -10,
      'color': '#cdd6f4', // ctp-text
      'font-size': 12,
      'font-weight': 'bold'
    }
  },
  
  // 选中的边
  {
    selector: 'edge:selected',
    style: {
      'line-color': '#89b4fa', // ctp-blue
      'target-arrow-color': '#89b4fa',
      'width': 3
    }
  },
  
  // 悬停效果
  {
    selector: 'node:active',
    style: {
      'overlay-color': '#89b4fa',
      'overlay-opacity': 0.2
    }
  },
  
  {
    selector: 'edge:active',
    style: {
      'overlay-color': '#89b4fa',
      'overlay-opacity': 0.2
    }
  }
]

export const faLayoutOptions = {
  name: 'preset',
  positions: undefined, // 使用数据中的位置
  zoom: 1,
  pan: { x: 0, y: 0 }
}

export const faCytoscapeOptions = {
  style: faStylesheet,
  layout: faLayoutOptions,
  // 启用交互
  userZoomingEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: true,
  selectionType: 'single' as const,
  // 性能优化
  textureOnViewport: false,
  motionBlur: false,
  wheelSensitivity: 0.1
}
