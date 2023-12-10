import { useRef, useState, useEffect, RefObject } from 'react'

export const useRect = (): [RefObject<HTMLDivElement>, DOMRect | null] => {
	const gridRef = useRef<HTMLDivElement>(null)
	const [gridRect, setGridRect] = useState<DOMRect | null>(null)

	const onChangeViewport = () => {
		if (gridRef.current) {
			setGridRect(gridRef.current.getBoundingClientRect())
		}
	}

	useEffect(() => {
		window.addEventListener('resize', onChangeViewport)
		window.addEventListener('scroll', onChangeViewport)

		onChangeViewport()

		return () => {
			window.removeEventListener('resize', onChangeViewport)
			window.removeEventListener('scroll', onChangeViewport)
		}
	}, [])

	return [gridRef, gridRect]
}
