export const lrStylesheet: any[] = [
  // 节点样式
  {
    selector: 'node',
    style: {
      'background-color': '#313244', // ctp-surface0
      'border-color': '#585b70', // ctp-surface2
      'border-width': 2,
      'width': 80,
      'height': 40,
      'shape': 'round-rectangle',
      'label': 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#cdd6f4', // ctp-text
      'font-size': 12,
      'font-weight': 'bold',
      'cursor': 'move',
      'text-wrap': 'wrap',
      'text-max-width': 70
    }
  },
  
  // LR项目节点
  {
    selector: 'node[type="item"]',
    style: {
      'background-color': '#45475a', // ctp-surface1
      'border-color': '#6c7086', // ctp-overlay0
      'width': 100,
      'height': 50
    }
  },
  
  // 状态节点
  {
    selector: 'node[type="state"]',
    style: {
      'background-color': '#313244', // ctp-surface0
      'border-color': '#fab387', // ctp-peach
      'width': 60,
      'height': 60,
      'shape': 'ellipse'
    }
  },
  
  // 起始状态
  {
    selector: 'node[isStart]',
    style: {
      'border-color': '#a6e3a1', // ctp-green
      'border-width': 3
    }
  },
  
  // 接受状态
  {
    selector: 'node[isAccept]',
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
      'font-size': 11,
      'font-weight': 'bold',
      'text-wrap': 'wrap',
      'text-max-width': 100
    }
  },
  
  // 归约边（reduce transitions）
  {
    selector: 'edge[type="reduce"]',
    style: {
      'line-color': '#f9e2af', // ctp-yellow
      'target-arrow-color': '#f9e2af',
      'line-style': 'dashed'
    }
  },
  
  // 移进边（shift transitions）
  {
    selector: 'edge[type="shift"]',
    style: {
      'line-color': '#94e2d5', // ctp-teal
      'target-arrow-color': '#94e2d5'
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

export const lrLayoutOptions = {
  name: 'preset',
  positions: undefined, // 使用数据中的位置
  zoom: 1,
  pan: { x: 0, y: 0 }
}

export const lrCytoscapeOptions = {
  style: lrStylesheet,
  layout: lrLayoutOptions,
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
