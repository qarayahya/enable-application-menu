import { registerPlugin } from "@wordpress/plugins";
import { __experimentalMainDashboardButton as MainDashboardButton } from "@wordpress/edit-post";
import { Dropdown, Button, MenuGroup, MenuItem } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	wordpress,
	chevronDown,
	chevronRight,
	Icon,
	external,
} from "@wordpress/icons";
import { useDispatch, useSelect } from "@wordpress/data";
import { useCallback } from "@wordpress/element";

import "./editor.scss";
import EditMenuItems from "./menu-items/edit";
import ViewMenuItems from "./menu-items/view";

const ApplicationMenu = () => {
	const { open: openCommandCenter } = useDispatch("core/commands");
	const { toggleFullscreenMode } = useDispatch("core/edit-post"); // TODO: add "toggleFullscreenMode" to the view menu

	const openLinks = useCallback((url) => {
		window.open(url);
	}, []);

	// Use the absolute site URL so admin links work even on subdirectory installs (e.g. Multisites).
	const siteUrl = useSelect((select) => select("core").getSite()?.url, []);

	const dashboardUrl = siteUrl ? `${siteUrl}/wp-admin/` : "/wp-admin/";
	const stylesUrl = siteUrl
		? `${siteUrl}/wp-admin/site-editor.php?path=/wp_global_styles`
		: "/wp-admin/site-editor.php?path=/wp_global_styles";
	const templatesUrl = siteUrl
		? `${siteUrl}/wp-admin/site-editor.php?path=/wp_template`
		: "/wp-admin/site-editor.php?path=/wp_template";
	const patternsUrl = siteUrl
		? `${siteUrl}/wp-admin/site-editor.php?path=/patterns`
		: "/wp-admin/site-editor.php?path=/patterns";
	const mediaUrl = siteUrl
		? `${siteUrl}/wp-admin/upload.php`
		: "/wp-admin/upload.php";

	return (
		<>
			<MainDashboardButton>
				<Dropdown
					style={{
						marginLeft: "8px",
					}}
					className="enable-application-menu-dropdown"
					contentClassName="enable-application-menu-dropdown__content"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							style={{
								backgroundColor: "#1e1e1e",
							}}
							variant="primary"
							onClick={onToggle}
							aria-expanded={isOpen}
							icon={wordpress}
							iconSize={24}
							label={__("Application Menu", "enable-application-menu")}
						>
							<span style={{ display: "flex" }}>
								<Icon icon={chevronDown} size={20} />
							</span>
						</Button>
					)}
					renderContent={({ onClose }) => (
						<>
							<MenuGroup>
								<MenuItem
									onClick={() => {
										openCommandCenter();
										onClose();
									}}
								>
									{__("Actions", "enable-application-menu")}
								</MenuItem>
								<Button
									href={dashboardUrl}
									role="menuitem"
									__next40pxDefaultSize
								>
									{__("Go to Dashboard", "enable-application-menu")}
								</Button>
							</MenuGroup>
							<MenuGroup>
								<Button href={stylesUrl} role="menuitem" __next40pxDefaultSize>
									{__("Styles", "enable-application-menu")}
								</Button>

								<Button
									href={templatesUrl}
									role="menuitem"
									__next40pxDefaultSize
								>
									{__("Templates", "enable-application-menu")}
								</Button>
								<Button
									href={patternsUrl}
									role="menuitem"
									__next40pxDefaultSize
								>
									{__("Patterns", "enable-application-menu")}
								</Button>
								<Button href={mediaUrl} role="menuitem" __next40pxDefaultSize>
									{__("Media", "enable-application-menu")}
								</Button>
							</MenuGroup>
							<MenuGroup>
								{/* TODO: add document menu item */}
								<ViewMenuItems />
								<EditMenuItems />
								{/* TODO: add plugins menu item */}
							</MenuGroup>
							<MenuGroup>
								<Button
									href={
										"https://wordpress.org/documentation/article/wordpress-block-editor/"
									}
									target="_blank"
									rel="noopener noreferrer"
									role="menuitem"
									icon={external}
									iconSize={20}
									iconPosition="right"
									__next40pxDefaultSize
								>
									{__("Help", "enable-application-menu")}
								</Button>
							</MenuGroup>
						</>
					)}
				/>
			</MainDashboardButton>
		</>
	);
};

registerPlugin("main-dashboard-button-test", {
	render: ApplicationMenu,
});
