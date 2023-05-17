import React, { ReactNodeArray } from 'react'
import './SkeletonText.css'
import classNames from 'classnames'

interface SkeletonTextType {
  rowsCount?: number
  dark?: boolean
}

export const SkeletonText: React.FC<SkeletonTextType> = ({ rowsCount = 1, dark = false }) => {
  const rows: ReactNodeArray = []
  for (let i = 0; i < rowsCount; i++) {
    rows.push(<span key={i} className="skeleton-text__row"></span>)
  }
  return <div className={classNames('skeleton-text', { 'skeleton-text--dark': dark })}>{rows}</div>
}
