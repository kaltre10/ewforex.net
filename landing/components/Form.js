'use strict';

import React from "react";
import { useForm } from "react-hook-form";

var Form = function Form() {
	var _useForm = useForm(),
	    register = _useForm.register,
	    handleSubmit = _useForm.handleSubmit,
	    watch = _useForm.watch,
	    errors = _useForm.formState.errors;

	var onSubmit = function onSubmit(data) {
		return console.log(data);
	};

	console.log(watch("example"));

	return React.createElement(
		"div",
		{ className: "form", onSubmit: handleSubmit(onSubmit) },
		React.createElement(
			"h2",
			null,
			"Libro de Reclamaciones"
		),
		React.createElement(
			"form",
			null,
			React.createElement(
				"div",
				{ className: "form-row" },
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"Nombre"
					),
					React.createElement("input", Object.assign({ type: "text", name: "nombre" }, register("exampleRequired", { required: true })))
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"Apellido"
					),
					React.createElement("input", { type: "text", name: "apellido" })
				)
			),
			React.createElement(
				"div",
				{ className: "form-row" },
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"Tipo de Documento"
					),
					React.createElement(
						"select",
						null,
						React.createElement(
							"option",
							{ value: "" },
							"-Seleccion-"
						),
						React.createElement(
							"option",
							{ value: "DNI" },
							"DNI"
						),
						React.createElement(
							"option",
							{ value: "CE" },
							"CARNET DE EXTRANJERIA"
						),
						React.createElement(
							"option",
							{ value: "PASS" },
							"PASAPORTE"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"N\xB0 de Documento"
					),
					React.createElement("input", { type: "number", name: "n_documento" })
				)
			),
			React.createElement(
				"div",
				{ className: "form-row" },
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"Correo"
					),
					React.createElement("input", { type: "email", name: "correo" })
				),
				React.createElement(
					"div",
					{ className: "form-control" },
					React.createElement(
						"label",
						null,
						"Telefono"
					),
					React.createElement("input", { type: "tel", name: "telefono" })
				)
			),
			React.createElement(
				"div",
				null,
				React.createElement(
					"label",
					null,
					"Detalle del reclamo"
				),
				React.createElement("textarea", { name: "detalle" })
			),
			React.createElement(
				"div",
				null,
				errors.exampleRequired && React.createElement(
					"span",
					null,
					"This field is required"
				),
				React.createElement(
					"button",
					{ type: "submit" },
					"Enviar"
				)
			)
		)
	);
};

export default Form;