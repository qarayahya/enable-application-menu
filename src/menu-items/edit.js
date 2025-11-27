import { Dropdown, Button, MenuGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { chevronRight } from "@wordpress/icons";
import { useDispatch, useSelect } from "@wordpress/data";
import { displayShortcut } from "@wordpress/keycodes";
// import { PageTemplate } from "@wordpress/editor";

const EditMenuItems = () => {
	const { undo } = useDispatch("core/editor");
	const { redo } = useDispatch("core/editor");

	const hasUndo = useSelect(
		(select) => select("core/editor").hasEditorUndo(),
		[]
	);

	const hasRedo = useSelect(
		(select) => select("core/editor").hasEditorRedo(),
		[]
	);

	return (
		<>
			<Dropdown
				className="application-menu-item__edit"
				contentClassName="application-menu-item__content"
				style={{
					width: "100%",
				}}
				popoverProps={{ placement: "right-start" }}
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						onClick={onToggle}
						aria-expanded={isOpen}
						label={__("Edit", "enable-application-menu")}
						role="menuitem"
						icon={chevronRight}
						iconSize={20}
						iconPosition="right"
						__next40pxDefaultSize
					>
						{__("Edit", "enable-application-menu")}
					</Button>
				)}
				renderContent={({ onClose }) => (
					<>
						<MenuGroup>
							<Button
								__next40pxDefaultSize
								role="menuitem"
								label={__("Undo")}
								shortcut={displayShortcut.primary("z")}
								aria-disabled={!hasUndo}
								onClick={hasUndo ? undo : undefined}
							>
								{__("Undo", "enable-application-menu")}
							</Button>
							<Button
								__next40pxDefaultSize
								role="menuitem"
								label={__("Redo")}
								shortcut={displayShortcut.primary("y")}
								aria-disabled={!hasRedo}
								onClick={hasRedo ? redo : undefined}
							>
								{__("Redo", "enable-application-menu")}
							</Button>
						</MenuGroup>
					</>
				)}
			/>
		</>
	);
};

export default EditMenuItems;
