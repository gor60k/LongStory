type Props = {
	active: boolean;
}

export default function DragOverlay({active}: Props) {

	if (!active) return null;

	return (
			<div className="
            absolute
            inset-0
            rounded-xl
            border-2
            border-dashed
            border-primary
            bg-primary/5
            flex
            items-center
            justify-center
            pointer-events-none
        ">
				Drop image here
			</div>
	);
}