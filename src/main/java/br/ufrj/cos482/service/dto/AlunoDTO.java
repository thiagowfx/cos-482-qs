package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusMatricula;

/**
 * A DTO for the Aluno entity.
 */
public class AlunoDTO implements Serializable {

    private Long id;

    private String dre;

    private StatusMatricula matricula;


    private Long declaracaoConclusaoId;
    
    private Long historicoGraduacaoId;
    
    private Long usuarioId;
    
    private Set<ProfessorDTO> orientadors = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getDre() {
        return dre;
    }

    public void setDre(String dre) {
        this.dre = dre;
    }
    public StatusMatricula getMatricula() {
        return matricula;
    }

    public void setMatricula(StatusMatricula matricula) {
        this.matricula = matricula;
    }

    public Long getDeclaracaoConclusaoId() {
        return declaracaoConclusaoId;
    }

    public void setDeclaracaoConclusaoId(Long documentoSistemaId) {
        this.declaracaoConclusaoId = documentoSistemaId;
    }

    public Long getHistoricoGraduacaoId() {
        return historicoGraduacaoId;
    }

    public void setHistoricoGraduacaoId(Long documentoSistemaId) {
        this.historicoGraduacaoId = documentoSistemaId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Set<ProfessorDTO> getOrientadors() {
        return orientadors;
    }

    public void setOrientadors(Set<ProfessorDTO> professors) {
        this.orientadors = professors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlunoDTO alunoDTO = (AlunoDTO) o;

        if ( ! Objects.equals(id, alunoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AlunoDTO{" +
            "id=" + id +
            ", dre='" + dre + "'" +
            ", matricula='" + matricula + "'" +
            '}';
    }
}
