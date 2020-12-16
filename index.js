const core = require("@actions/core");
const exec = require("child_process").exec;

const PMD_VERSION = "6.30.0";

try {
	installPMD();
} catch (error) {
	core.setFailed(error.message);
}

function installPMD() {
	const download = `wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F${PMD_VERSION}/pmd-bin-${PMD_VERSION}.zip -P /tmp`;
	const unzip = `unzip /tmp/pmd-bin-${PMD_VERSION}.zip -d /tmp`;
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
	const mk = "sudo mkdir /snap/bin && sudo chmod -R 757 /snap/bin";
	const cmd = `sudo echo '#! /bin/bash
$HOME/pmd/bin/run.sh pmd "$@"' > /snap/bin/pmd`;
	const cm = "chmod +x /snap/bin/pmd";
	exec(mk + " && " + cmd + " && " + cm, function (error, stdout, stderr) {
		if (error) core.setFailed(stderr);
		core.debug(stdout);
	});
}
