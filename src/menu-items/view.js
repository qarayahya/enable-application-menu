import { Dropdown, Button, MenuGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { chevronRight } from "@wordpress/icons";
import { useDispatch } from "@wordpress/data";
import {
	PreferenceToggleMenuItem,
	store as preferencesStore,
} from "@wordpress/preferences";
import { displayShortcut } from "@wordpress/keycodes";

const ViewMenuItems = () => {
	const { set: setPreference } = useDispatch(preferencesStore);

	const turnOffDistractionFree = () => {
		setPreference("core/edit-post", "distractionFree", false);
	};

	return (
		<>
			<Dropdown
				className="application-menu-item__view"
				contentClassName="application-menu-item__content"
				style={{
					width: "100%",
				}}
				popoverProps={{ placement: "right-start" }}
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						onClick={onToggle}
						aria-expanded={isOpen}
						label={__("View", "enable-application-menu")}
						role="menuitem"
						icon={chevronRight}
						iconSize={20}
						iconPosition="right"
						__next40pxDefaultSize
					>
						{__("View", "enable-application-menu")}
					</Button>
				)}
				renderContent={({ onClose }) => (
					<>
						<MenuGroup label={__("Display Options", "enable-application-menu")}>
							<PreferenceToggleMenuItem
								scope="core"
								name="fixedToolbar"
								onToggle={turnOffDistractionFree}
								label={__("Top Toolbar", "enable-application-menu")}
								info={__(
									"Access all block and document tools in a single place",
									"enable-application-menu"
								)}
								messageActivated={__(
									"Top toolbar activated.",
									"enable-application-menu"
								)}
								messageDeactivated={__(
									"Top toolbar deactivated.",
									"enable-application-menu"
								)}
							/>
							<PreferenceToggleMenuItem
								scope="core"
								name="distractionFree"
								label={__("Distraction Free", "enable-application-menu")}
								info={__("Write with calmness", "enable-application-menu")}
								messageActivated={__(
									"Distraction free mode activated.",
									"enable-application-menu"
								)}
								messageDeactivated={__(
									"Distraction free mode deactivated.",
									"enable-application-menu"
								)}
								shortcut={displayShortcut.primaryShift("\\")}
							/>
							<PreferenceToggleMenuItem
								scope="core"
								name="focusMode"
								label={__("Spotlight Mode", "enable-application-menu")}
								info={__(
									"Focus on one block at a time",
									"enable-application-menu"
								)}
								messageActivated={__(
									"Spotlight mode activated.",
									"enable-application-menu"
								)}
								messageDeactivated={__(
									"Spotlight mode deactivated.",
									"enable-application-menu"
								)}
							/>
							<PreferenceToggleMenuItem
								scope="core/edit-post"
								name="fullscreenMode"
								label={__("Fullscreen Mode", "enable-application-menu")}
								info={__("Work without distraction", "enable-application-menu")}
								messageActivated={__(
									"Fullscreen mode activated.",
									"enable-application-menu"
								)}
								messageDeactivated={__(
									"Fullscreen mode deactivated.",
									"enable-application-menu"
								)}
							/>
						</MenuGroup>
						<MenuGroup label={__("Block Editor", "enable-application-menu")}>
							<PreferenceToggleMenuItem
								scope="core"
								name="showBlockBreadcrumbs"
								label={__("Show Block Breadcrumbs", "enable-application-menu")}
								info={__(
									"Display the block hierarchy path",
									"enable-application-menu"
								)}
								messageActivated={__(
									"Block breadcrumbs shown.",
									"enable-application-menu"
								)}
								messageDeactivated={__(
									"Block breadcrumbs hidden.",
									"enable-application-menu"
								)}
							/>
						</MenuGroup>
					</>
				)}
			/>
		</>
	);
};

export default ViewMenuItems;
