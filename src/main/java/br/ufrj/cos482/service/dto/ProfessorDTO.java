package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the Professor entity.
 */
public class ProfessorDTO implements Serializable {

    private Long id;

    private String nome;

    private String siape;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSiape() {
        return siape;
    }

    public void setSiape(String siape) {
        this.siape = siape;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfessorDTO professorDTO = (ProfessorDTO) o;

        if ( ! Objects.equals(id, professorDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProfessorDTO{" +
            "id=" + id +
            ", nome='" + nome + "'" +
            ", siape='" + siape + "'" +
            '}';
    }
}
