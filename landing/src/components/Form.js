'use strict';

import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {

	const { register, handleSubmit, watch, formState: { errors } } = useForm();
  	const onSubmit = data => console.log(data);

  	console.log(watch("example"));
	
    return( <div className="form" onSubmit={handleSubmit(onSubmit)}>
    			<h2>Libro de Reclamaciones</h2>
	    		<form>
	    			<div className="form-row">
	    				<div className="form-control">
							<label>Nombre</label>
							<input type="text" name="nombre" {...register("exampleRequired", { required: true })} />
						</div>
	    				<div className="form-control">
							<label>Apellido</label>
							<input type="text" name="apellido" />
						</div>
					</div>
					<div className="form-row">
						<div className="form-control">
							<label>Tipo de Documento</label>
							<select>
								<option value="">-Seleccion-</option>
								<option value="DNI">DNI</option>
								<option value="CE">CARNET DE EXTRANJERIA</option>
								<option value="PASS">PASAPORTE</option>
							</select>
						</div>
						<div className="form-control">
							<label>N° de Documento</label>
							<input type="number" name="n_documento" />
						</div>
					</div>
					<div className="form-row">
						<div className="form-control">
							<label>Correo</label>
							<input type="email" name="correo" />
						</div>
						<div className="form-control">
							<label>Telefono</label>
							<input type="tel" name="telefono" />
						</div>
					</div>
					
					<div>
						<label>Detalle del reclamo</label>
						<textarea name="detalle"></textarea>
					</div>
					<div>
						{errors.exampleRequired && <span>This field is required</span>}
						<button type="submit" >Enviar</button>
					</div>
				</form>
			</div>
	);

}


export default Form;