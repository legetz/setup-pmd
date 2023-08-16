const core = require("@actions/core");
const exec = require("child_process").exec;

const PMD_VERSION = "7.0.0-rc3";

try {
	installPMD();
} catch (error) {
	core.setFailed(error.message);
}

function installPMD() {
	const distName = `pmd-dist-${PMD_VERSION}-bin`;
	const download = `wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F${PMD_VERSION}/${distName}.zip -P /tmp`;
	const unzip = `unzip /tmp/${distName}.zip -d /tmp`;
	const mk = "mkdir $HOME/pmd";
	const mv = `mv /tmp/pmd-bin-${PMD_VERSION}/* $HOME/pmd`;
	exec(
		download + " && " + unzip + " && " + mk + " && " + mv,
		function (error, stdout, stderr) {
			if (error) core.setFailed(stderr);
			core.debug(stdout);
			referencePMD();
		}
	);
}

function referencePMD() {
	const mk = "sudo mkdir -p /snap/bin && sudo chmod -R 757 /snap/bin";
	const cmd = `sudo echo '#! /bin/bash
$HOME/pmd/bin/run.sh pmd "$@"' > /snap/bin/pmd`;
	const cm = "chmod +x /snap/bin/pmd";
	exec(mk + " && " + cmd + " && " + cm, function (error, stdout, stderr) {
		if (error) core.setFailed(stderr);
		core.debug(stdout);
	});
}
