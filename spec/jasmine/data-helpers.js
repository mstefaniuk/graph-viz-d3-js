"use strict";

(function() {

	var root = this,
		toString = Object.prototype.toString;

	function all(description, dataset, fn) {
		return createDataDrivenSpecs(root.it, description, dataset, fn, true);
	}

	function xall(description, dataset, fn) {
		return createDataDrivenSpecs(root.xit, description, dataset, fn, true);
	}

	function using(description, dataset, fn) {
		return createDataDrivenSpecs(root.describe, description, dataset, fn, false);
	}

	function xusing(description, dataset, fn) {
		return createDataDrivenSpecs(root.xdescribe, description, dataset, fn, false);
	}

	function createSyncDataDrivenFn(args, fn) {
		return function synchronousSpec() {
			fn.apply(this, args);
		};
	}

	function createAsyncDataDrivenFn(args, fn) {
		return function asynchronousSpec(done) {
			var fnArgs = [done];
			fnArgs.unshift.apply(fnArgs, args);
			fn.apply(this, fnArgs);
		};
	}

	function createVariantDescription(description, args, index) {
		var variantDesc = description + " (Variant #" + index + " <",
			i = 0, length = args.length, x;

		for (i; i < length; i++) {
			if (i > 0) {
				variantDesc += ", ";
			}

			if (typeof args[i] === "string") {
				variantDesc += '"' + args[i] + '"';
			}
			else if (isArray(args[i])) {
				variantDesc += toString.call(args[i]);
			}
			else {
				variantDesc += String(args[i]);
			}
		}

		variantDesc += ">)";

		return variantDesc;
	}

	function createDataDrivenSpecs(specProvider, description, dataset, fn, isAsyncAllowed) {
		var i = 0,
			length = 0,
			specs = [],
			args,
			maxArgCount = 0,
			variantDesc,
			suite;

		if (!dataset || !isArray(dataset) || dataset.length === 0) {
			throw error("Jasmine.ArgumentsMissingError", "No arguments for a data-driven test were provided ({0})", description);
		}

		// Validate the dataset first
		for (i, length = dataset.length; i < length; i++) {
			args = isArray(dataset[i]) ? dataset[i] : [dataset[i]];
			maxArgCount = maxArgCount || args.length;
			variantDesc = createVariantDescription(description, args, i);

			if (args.length !== maxArgCount) {
				throw error("Jasmine.ArgumentCountMismatchError",
					"Expected {0} argument(s). Found {1} at index {2} ({3})",
					maxArgCount, args.length, i, description);
			}
			else if (args.length === fn.length) {
				specs.push({
					description: variantDesc,
					fn: createSyncDataDrivenFn(args, fn)
				});
			}
			else if (isAsyncAllowed && args.length + 1 === fn.length) {
				specs.push({
					description: variantDesc,
					fn: createAsyncDataDrivenFn(args, fn)
				});
			}
			else {
				throw error("Jasmine.ArgumentCountMismatchError",
					"Expecting data driven spec to accept {0} {1}, but {2} {3} specified in the callback function ({4})",
					args.length,
					args.length === 1 ? "argument" : "arguments",
					fn.length,
					fn.length === 1 ? "argument is" : "arguments are",
					description);
			}
		}

		// Create the suite and specs
		suite = root.describe(description, function() {
			for (i = 0, length = specs.length; i < length; i++) {
				specProvider(specs[i].description, specs[i].fn);
			}
		});

		return suite;
	}

	function isArray(x) {
		return toString.call(x) === "[object Array]";
	}

	function error(name, message) {
		var args = Array.prototype.slice.call(arguments, 2),
			error;

		if (args && args.length) {
			message = message.replace(/\{(\d+)\}/g, function(match, index) {
				return args[Number(index)] || "";
			});
		}

		error = new Error(message);
		error.name = name;

		return error;
	}

	root.all = all;
	root.xall = xall;
	root.using = using;
	root.xusing = xusing;

}).call(this);
